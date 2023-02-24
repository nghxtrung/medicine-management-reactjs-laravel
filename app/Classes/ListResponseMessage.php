<?php

namespace App\Classes;

class ListResponseMessage
{
    public $IsSuccess;
    public $ErrorMessage;
    public $DataList;

    /**
     * @param $IsSuccess
     * @param $ErrorMessage
     * @param $DataList
     */
    public function __construct($IsSuccess = null, $ErrorMessage = null, $DataList = null)
    {
        $this->IsSuccess = $IsSuccess;
        $this->ErrorMessage = $ErrorMessage;
        $this->DataList = $DataList;
    }

    /**
     * @return mixed
     */
    public function getIsSuccess()
    {
        return $this->IsSuccess;
    }

    /**
     * @param mixed $IsSuccess
     */
    public function setIsSuccess($IsSuccess): void
    {
        $this->IsSuccess = $IsSuccess;
    }

    /**
     * @return mixed
     */
    public function getErrorMessage()
    {
        return $this->ErrorMessage;
    }

    /**
     * @param mixed $ErrorMessage
     */
    public function setErrorMessage($ErrorMessage): void
    {
        $this->ErrorMessage = $ErrorMessage;
    }

    /**
     * @return mixed
     */
    public function getDataList()
    {
        return $this->DataList;
    }

    /**
     * @param mixed $DataList
     */
    public function setDataList($DataList): void
    {
        $this->DataList = $DataList;
    }
}
