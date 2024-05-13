import initCkEditor from './ckeditor';
class AutoContent {
    constructor() {
        this.$body = $('body');
        this.promptForm = $('#setup-prompt');
        this.generateModal = $('#auto-content-modal');
        this.$body = $('body');

        if ($('#auto-content-modal').length) {
            this.handleGenerateEvents();
        }
        this.initEditor();
    }

    initEditor() {
        if (document.getElementById('preview_content')) {
            initCkEditor('preview_content');
        }
    }

    updateModalState(modal, isLoading) {
        const actionButton = modal.find('.modal-footer .btn:not([data-bs-dismiss])');

        if (isLoading) {
            actionButton.addClass('button-loading').css('pointer-events', 'none');
        } else {
            actionButton.removeClass('button-loading').css('pointer-events', '');
        }
    }

    loadDefaultPrompt(promptUrl) {
        let $self = this;
        let $promptForm = $self.promptForm;

        promptUrl = new URL(promptUrl);
        const entity = promptUrl.searchParams.get('entity');
        const $form = $('form');
        const $except = ['description', 'content', 'uri', 'ip', 'model', "prompt", "target_field", "preview_content"];
        let $formData = $form.serializeArray();

        $formData.push({ name: 'entity', value: entity });
        $formData = $formData.filter(item => !$except.includes(item.name));

        $.ajax({
            url: promptUrl,
            type: 'POST',
            data: $formData,
            beforeSend: () => {
                $self.updateModalState($self.generateModal, true);
                $promptForm.hide();
            },
            success: res => {
                if (res.error) {
                    Botble.showError(res.message);
                } else {
                    $self.handlePromptField(res.data);
                    // Botble.initResources();
                }
            },
            error: data => {
                $self.updateModalState($self.generateModal, false);
                $promptForm.show();
                Botble.handleError(data);
            },
            complete: () => {
                $self.updateModalState($self.generateModal, false);
                $promptForm.show();
            },
        });
    }

    pushContentToTarget($contentValue, $targetName) {
        if (!$targetName) {
            return;
        }

        $contentValue = $contentValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
        let $contentTarget = $('form').find('[name="' + $targetName + '"]');

        $contentTarget.each(function (index, element) {
            let id = element.id || '';

            if (EDITOR.CKEDITOR[id]) {
                EDITOR.CKEDITOR[id].setData($contentValue)
            } else {
                element.value = $contentValue;
            }
            Botble.showSuccess('Copied content!')
        });
    }

    handleGenerateEvents() {
        let $self = this;
        let $promptForm = $self.promptForm;
        let $previewEditor = $promptForm.find('#preview_content');
        let $targetField = $promptForm.find('#target_field');
        let $promptType = $promptForm.find('#prompt_type');
        let $promptEditor = $promptForm.find('#prompt');

        let $btnOpenGenerate = $('.btn-auto-content-generate');
        let $btnGenerate = $('#generate-content');
        let $btnPush = $('#push-content-to-target');

        const renderPrompt = (index = 0) => {
            if (typeof $promptTemplates !== 'undefined' && $promptTemplates[index]) {
                $promptEditor.val($promptTemplates[index].content);
            }
        }

        $btnOpenGenerate.on('click', function (event) {
            event.preventDefault();
            let $current = $(event.currentTarget);
            let $promptUrl = $current.data('load-form');

            $self.loadDefaultPrompt($promptUrl);
            $self.generateModal.modal('show');
        });

        $promptType.on('change', (e) => {
            renderPrompt($(e.currentTarget).val());
        });

        $btnGenerate.on('click', function (event) {
            event.preventDefault();

            let $current = $(event.currentTarget);
            let $generateUrl = $current.data('generate-url');
            let $promptValue = $promptEditor.val();

            $.ajax({
                url: $generateUrl,
                type: 'POST',
                data: {
                    prompt: $promptValue
                },
                beforeSend: () => {
                    $self.updateModalState($self.generateModal, true);
                },
                success: res => {
                    if (res.error) {
                        Botble.showError(res.message);
                    } else {
                        let editor = window.EDITOR.CKEDITOR[$previewEditor.prop('id')];
                        editor.setData(res.data.content);
                    }
                },
                error: data => {
                    Botble.handleError(data);
                },
                complete: () => {
                    $self.updateModalState($self.generateModal, false);
                },
            });
        });

        $btnPush.on('click', function (event) {
            event.preventDefault();

            console.log('here');
            let editor = window.EDITOR.CKEDITOR[$previewEditor.prop('id')]
            let $contentValue = editor.getData();
            $self.pushContentToTarget($contentValue, 'content');
            editor.setData('');
            $('#auto-content-modal').modal('hide');
        });

        renderPrompt(0);
    }

    handlePromptField($data) {
        const $self = this;
        const $extraField = $('#extra_items');
        const $promptForm = $self.promptForm;

        let $promptEditor = $promptForm.find('#prompt');
        let $extraFieldData = $data.extra_fields;

        if (!$extraFieldData instanceof Object) {
            $extraFieldData = {}
        }
        $extraField.empty();

        for (let key in $extraFieldData) {
            const newOption = $(`<label class="mb-2 me-3 d-inline-block"><input type="checkbox" value="${key}" name="extra_fields[]">${key}</label>`);
            $extraField.append(newOption);
        }

        $extraField.find('input[type="checkbox"]').on('change', function () {
            let $promptTypeVal = $promptForm.find('#prompt_type').val();
            let $promptValue = $promptTemplates[$promptTypeVal]['content'];
            let $clonedPrompt = $promptValue.slice($promptValue); //clone string
            let $extraContent = '';

            $promptEditor.val($promptValue);
            $extraField.find('input:checked').each(function () {
                $extraContent += "\n";
                $extraContent += $extraFieldData[$(this).val()] || '';
            });

            $clonedPrompt += $extraContent;
            $promptEditor.val($clonedPrompt);
        });

    }
}

$(document).ready(() => {
    new AutoContent();
});
