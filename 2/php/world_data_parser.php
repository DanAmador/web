<?php

class WorldDataParser {
	 function parseCSV($csvPath) {
	 	$dataArray = array(); 
	 	$arrayRow = array(); 

	 	$categories=array();
	 	
		$currentRow = 1;
		$numberOfCategories = 14; 

		$csvFile = fopen($csvPath, "r");

		while (($csvData = fgetcsv($csvFile, 0, ",")) !== FALSE){
			if ($currentRow==1){
				for ($i=0; $i<$numberOfCategories; $i++){
					$categrories[$i]=$csvData[$i];
				}
				$currentRow++;
			}

			else{

				for ($i=0; $i<$numberOfCategories; $i++){
						 $arrayRow[$categrories[$i]]=$csvData[$i];
					}

				$dataArray[]=$arrayRow;
	
				$currentRow++;
			}

		}
		fclose($csvFile);

		return $dataArray;
	}


	
	public function saveXML($dataArray) {
		if (is_null($dataArray)){
			return false;
		}

		$xmlDocument = new DOMDocument('1.0', 'utf-8');

		$xmlDocument->formatOutput = true;
		$root = $xmlDocument->createElement('Countries');
		$root = $xmlDocument->appendChild($root);

		foreach ($dataArray as $key => $value) {
			$country = $xmlDocument->createElement('Country');
			$country = $root->appendChild($country);

			foreach ($value as $key2 => $value2) {
				$categoryNode = $xmlDocument->createElement(strtok($key2, " "), rtrim($value2));
				$country->appendChild($categoryNode);
			}
		}

		$xmlDocument->save("./world_data.xml");
		//var_dump($xmlDocument);
		return true; 
	}

	public function printXML($xmlPath, $xslPath) {

		if (is_null($xslPath)){
			return "XSL Path Error";
		}

		if (is_null($xmlPath)){
			return "XML Path Error.";
		}

		$xsl = new DOMDocument();
		$xsl->load($xslPath);

		$xml = new DOMDocument();
		$xml->load($xmlPath);

		$xslProcessor = new XSLTProcessor();
		$xslProcessor->importStyleSheet($xsl);
		return $xslProcessor->transformToXML($xml);
	}

}

?>
