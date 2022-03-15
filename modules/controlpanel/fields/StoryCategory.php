<?php

namespace controlpanel\fields;
use craft\fields\Dropdown;

class StoryCategory extends Dropdown
{

	public static function getCategories(): array
	{	
		$categories = [];
		$query = \craft\elements\Category::find();
		$query->group('storyTypes');

		foreach ($query->all() as $category) {
			$categories[] = [
				'id' => json_encode($category->id),
            	'title' => json_encode($category->title)
			];
		}
		return $categories;
	}

	protected function buildDropdown($categories): void
	{

		$this->options = [
			[
				'label' => 'Select a story type',
				'value' => '',
				'disabled' => true,
			]
		];

		$this->options[] = [
			'label' => 'Testing',
			'value' => 'testing'
		];


		// Check for matching categories
        if ( $categories ) {
			foreach ($categories as $category) {
				$this->options[] = [
					'label' => $category['title'],
					'value' => $category['id']
				];
			}
		}

	}

    public function init()
	{	
		//$categories = $this->getCategories();
		$categories = [];
		$this->buildDropdown($categories);
		parent::init();
	}
    
    public static function displayName(): string
	{
		return "Story Categories";
	}

	public function getSettingsHtml()
	{
		return;
	}

}