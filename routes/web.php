<?php

Route::group(['namespace' => 'FoxSolution\AutoContent\Http\Controllers', 'middleware' => ['web', 'core']], function () {
    Route::group(['prefix' => BaseHelper::getAdminPrefix(), 'middleware' => 'auth'], function () {
        Route::group(['prefix' => 'auto-content', 'as' => 'auto-content.'], function () {
            Route::group(['prefix' => 'generate'], function () {
                Route::post('/generate-prompt', [
                    'as' => 'generate-prompt',
                    'uses' => 'AutoContentController@generatePrompt',
                ]);
                Route::post('/generate-image', [
                    'as' => 'generate-image',
                    'uses' => 'AutoContentController@generateImage',
                ]);
                Route::post('/', [
                    'as' => 'generate',
                    'uses' => 'AutoContentController@generate',
                ]);
                Route::post('/save-image', [
                    'as' => 'save-image',
                    'uses' => 'AutoContentController@saveImage',
                ]);
            });

            Route::group(['prefix' => 'settings', 'as' => 'setting.'], function () {
                Route::get('/', [
                    'as' => 'index',
                    'uses' => 'AutoContentController@settings',
                ]);
                Route::post('/', [
                    'as' => 'edit',
                    'uses' => 'AutoContentController@postEdit',
                ]);
            });
        });
    });
});
