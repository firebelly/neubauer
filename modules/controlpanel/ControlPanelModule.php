<?php

namespace controlpanel;

use Craft;
use controlpanel\fields\DateByYear;
use Yii\base\Event;
use craft\services\Fields;
use craft\events\RegisterComponentTypesEvent;

class ControlPanelModule extends \yii\base\Module
{
    private function _registerCustomFieldTypes()
    {
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = DateByYear::class;
            }
        );
    }

    public function init()
    {
        $this->_registerCustomFieldTypes();
    }
}
