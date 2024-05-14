<?php

namespace FoxSolution\AutoContent\Http\Requests;

use Botble\Setting\Http\Requests\SettingRequest as BaseRequest;

class GenerateRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'prompt' => 'string|nullable',
            'image_prompt' => 'string|nullable',
        ];
    }
}
