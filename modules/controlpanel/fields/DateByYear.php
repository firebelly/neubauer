<?php

namespace controlpanel\fields;
use craft\fields\Dropdown;

class DateByYear extends Dropdown
{

	protected function setYears(): void
	{	
		$years = range(2010,2022);

		$this->options = [
			[
				'label' => 'Select a year',
				'value' => '',
				'disabled' => true,
			]
		];

		foreach ($years as $value) {

			$this->options[] = [
				'label' => $value,
				'value' => $value
			];
		
		}

	}

    public function init()
	{	
		$this->setYears();
		parent::init();
	}
    
    public static function displayName(): string
	{
		return "Date By Year";
	}

	public function getSettingsHtml()
	{
		return;
	}

}