<?php

namespace FoxSolution\AutoContent;

use Botble\PluginManagement\Abstracts\PluginOperationAbstract;
use Setting;

class Plugin extends PluginOperationAbstract
{
    public static function activated()
    {
        $settings = [
            'autocontent_proxy_enable' => 0,
            'autocontent_proxy_protocol' => null,
            'autocontent_proxy_ip' => null,
            'autocontent_proxy_port' => null,
            'autocontent_proxy_username' => null,
            'autocontent_proxy_password' => null,
            'autocontent_prompt_template' => '[{"title":"default","content":"Blog Post. "}]',
            'autocontent_openai_key' => null,
            'autocontent_openai_temperature' => 1,
            'autocontent_openai_frequency_penalty' => 0,
            'autocontent_openai_presence_penalty' => 0,
            'autocontent_openai_models' => '["gpt-3.5-turbo"]',
            'autocontent_openai_default_model' => 'gpt-3.5-turbo',
        ];

        foreach ($settings as $key => $item) {
            Setting::set($key, $item);
        }
        Setting::save();
    }
}
