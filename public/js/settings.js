(()=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,n(a.key),a)}}function n(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var a=o.call(t,n||"default");if("object"!=e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"==e(n)?n:n+""}var o=function(){return e=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$modelWrapper=$("#openai-model-wrapper"),this.$promptTemplateWrapper=$("#prompt-template-wrapper"),this.$modelWrapper.length&&this.handleMultipleModels(),this.$promptTemplateWrapper.length&&Array.isArray($promptTemplates)&&this.handleMultiPromptTemplate()},n=[{key:"handleMultipleModels",value:function(){var e=this.$modelWrapper.find("#add-model"),t=this.$modelWrapper.data("default"),n=this.$modelWrapper.data("models");n.length||(n=[""]);var o=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=$('<div class="d-flex mt-2 more-model align-items-center">\n          <input type="radio" name="autocontent_openai_default_model" class="setting-selection-option default-model" value="'.concat(n,'" ').concat(n===t?"checked":"",'>\n          <input class="next-input item-model" placeholder="').concat(e.data("placeholder"),'" name="autocontent_openai_models[]" value="').concat(n,'" />\n          <a class="btn btn-link text-danger"><i class="fas fa-minus"></i></a>\n        </div>'));e.before(o)};this.$modelWrapper.on("click",".more-model > a",(function(){$(this).parents(".more-model").remove(),$(".more-model").length||o()})),this.$modelWrapper.on("change",".more-model > input.item-model",(function(){var e=$(this).val();$(this).siblings(".default-model").val(e)})),e.on("click",(function(e){e.preventDefault(),o()})),n.forEach((function(e){o(e)}))}},{key:"handleMultiPromptTemplate",value:function(){this.handleMultiTemplate("prompt")}},{key:"handleMultiTemplate",value:function(e){var t=this.$promptTemplateWrapper,n=t.find(".add-template"),o=$("#prompt-html-template").get(0),a=0,r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",l=$(o.innerHTML);l.find(".item-title").attr("name","autocontent_".concat(e,"_template[").concat(a,"][title]")).val(t),l.find(".item-content").attr("name","autocontent_".concat(e,"_template[").concat(a,"][content]")).val(r),a++,n.before(l)};t.on("click",".more-template .remove-template",(function(e){e.preventDefault(),$(this).parents(".more-template").remove(),t.find(".more-template").length||r()})),n.on("click",(function(e){e.preventDefault(),r()})),$promptTemplates.forEach((function(e){var t=e.title,n=e.content;r(t,n)}))}}],n&&t(e.prototype,n),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,n,o}();$(document).ready((function(){new o}))})();