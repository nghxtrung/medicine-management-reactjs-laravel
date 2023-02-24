<?php

namespace App\Classes;

class ActionResponseMessage
{
    public $IsSuccess;
    public $ErrorMessage;

    /**
     * @param $IsSuccess
     * @param $ErrorMessage
     */
    public function __construct($IsSuccess = null, $ErrorMessage = null)
    {
        $this->IsSuccess = $IsSuccess;
        $this->ErrorMessage = $ErrorMessage;
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
}
