<?php

namespace controlpanel\fields;
use craft\fields\Dropdown;

class StoryCategory extends Dropdown
{

	protected static function getCategories(): array
	{	
		$categories = array();
		$query = \craft\elements\Category::find();
		$query->group('storyTypes');
		$results = $query->all();

		foreach ($results as $category) {
			$categories[] = [
				json_encode($category->slug) => json_encode($category->title)
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
					'label' => $category,
					'value' => $category
					// 'label' => $category['title'],
					// 'value' => $category['id']
				];
			}
		}

	}

    public function init()
	{	
		$categories = $this->getCategories();
		//$categories = [];
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