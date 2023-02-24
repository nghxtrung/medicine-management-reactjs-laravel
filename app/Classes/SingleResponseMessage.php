<?php

namespace App\Classes;

class SingleResponseMessage
{
    public $IsSuccess;
    public $ErrorMessage;
    public $Item;

    /**
     * @param $IsSuccess
     * @param $ErrorMessage
     * @param $Item
     */
    public function __construct($IsSuccess = null, $ErrorMessage = null, $Item = null)
    {
        $this->IsSuccess = $IsSuccess;
        $this->ErrorMessage = $ErrorMessage;
        $this->Item = $Item;
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
    public function getItem()
    {
        return $this->Item;
    }

    /**
     * @param mixed $Item
     */
    public function setItem($Item): void
    {
        $this->Item = $Item;
    }
}
