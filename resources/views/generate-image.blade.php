@php
    $promptTemplate = '';
    $promptTitle = '';
    $formBuilder = new FormBuilder();
@endphp
<form id="setup-prompt" action="">
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <div class="form-group mb-3">
                {{ Form::label('size', trans('plugins/auto-content::content.form.image_size'), ['class' => 'text-title-field']) }}
                <div class="ui-select-wrapper">
                    {{ Form::select('size', ['256x256 - Square', '512x512 - Square', '1024x1024 - Square','1024x1792 - Portrait','1792x1024 - Landscape'], 'size', ['class' => 'ui-select', 'id' => 'size']) }}
                    <svg class="svg-next-icon svg-next-icon-size-16">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select-chevron"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-6">
            {{ Form::label('image_prompt', trans('plugins/auto-content::content.form.prompt_label'), ['class' => 'text-title-field']) }}
            <div class="form-group mb-3">
                {{ Form::textarea('image_prompt', null, ['class' => 'next-input', 'rows' => 5, 'placeholder' => trans('plugins/auto-content::content.form.prompt_placeholder'), 'id' => 'image_prompt']) }}
            </div>
        </div>
        <div class="col-md-12 col-sm-6">
            <a href="" id="image_url" target="_blank"><img src="" alt="" id="image_preview" style="display: none; max-height:512px;"></a>
        </div>
    </div>
</form>
