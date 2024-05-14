<?php

namespace FoxSolution\AutoContent\Actions\Traits;

use Botble\Media\Models\MediaFile;
use Botble\Media\Models\MediaFolder;
use Botble\Media\RvMedia;
use Botble\Media\Services\ThumbnailService;
use Botble\Media\Services\UploadsManager;
use FoxSolution\AutoContent\Http\Requests\GenerateRequest;
use FoxSolution\AutoContent\Http\Requests\PromptRequest;
use FoxSolution\AutoContent\Supports\AutoContentSupport;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Illuminate\Http\Request;
use OpenAi;
use Illuminate\Support\Facades\Storage;

/**
 * @property Request $request
 * @property BaseHttpResponse $response
 */
trait AutoContentGenerate
{
    public function generatePrompt(PromptRequest $request)
    {
        $entityType = $request->get('entity');
        $optionText = [];

        $fieldsData = [
            'product' => AutoContentSupport::getDataFromFieldForProduct($this->request),
        ];

        $fieldsData = apply_filters(AUTOCONTENT_FILTER_ADD_SUPPORT_FIELDS, $fieldsData);
        $optionText = data_get($fieldsData, $entityType);

        return $this->response->setData([
            'extra_fields' => $optionText,
        ]);
    }

    public function generate(GenerateRequest $request)
    {
        $prompt = $request->get('prompt');
        $apiModel = setting('autocontent_openai_default_model');

        if (! OpenAi::checkInitedOpenAi()) {
            return $this->response
                ->setError(true)
                ->setMessage(trans('plugins/auto-content::content.error.OpenAi not initialized'));
        }

        $prompt = trans('plugins/auto-content::content.form.request_output_format')."\n".$prompt;

        OpenAi::setApiModel($apiModel);
        $result = OpenAi::generateContent($prompt);

        return $this->response
            ->setData(['content' => $result]);
    }

    public function generateImage(GenerateRequest $request)
    {

        $prompt = $request->get('image_prompt');
        $size = $request->get('size');

        $apiModel = setting('autocontent_openai_default_model');

        if (! OpenAi::checkInitedOpenAi()) {
            return $this->response
                ->setError(true)
                ->setMessage(trans('plugins/auto-content::content.error.OpenAi not initialized'));
        }

//        $prompt = trans('plugins/auto-content::content.form.request_output_format')."\n".$prompt;

        $result = OpenAi::generateImage($prompt, $size);

        return $this->response
            ->setData(['content' => $result]);
    }

    public function saveImage(GenerateRequest $request)
    {

        $url = $request->get('url');
        $image = file_get_contents($url);
        $timestamp = date('Y_m_d_H_i_s');
        $fileName = $timestamp . '.png';
        $filePath = 'generated/' . $fileName;
        $uploadManager = new UploadsManager();
        $thumbnailService = new ThumbnailService($uploadManager);
        Storage::put($filePath, $image, 'public');
        $mediaFolder = MediaFolder::firstOrCreate([
            'name' => 'generated',
            'slug' => 'generated',
            'parent_id' => 0,
            'user_id' => 0,
        ]);
        $mediaFile = MediaFile::create([
            'name' => $fileName,
            'mime_type' => 'image/png',
            'size' => Storage::size($filePath),
            'url' => $filePath,
            'folder_id' => $mediaFolder->id,
            'user_id' => 0,
        ]);
        $rvMedia = new RvMedia($uploadManager, $thumbnailService);
        $rvMedia->generateThumbnails($mediaFile);
        return $this->response
        ->setData(['content' => 'Successfully saved image']);
    }
}
