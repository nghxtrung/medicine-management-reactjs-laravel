<?php

namespace App\Http\Controllers;

use App\Classes\ActionResponseMessage;
use App\Models\OrderDetail;
use App\Models\OrderList;
use Illuminate\Http\Request;

class OrderListController extends Controller
{
    public function getListOrder()
    {
        return response()->json(OrderList::all());
    }

    public function getListOrderUser(Request $request)
    {
        $userId = $request->query('userId');
        return response()->json(OrderList::where('UserId', $userId)->get());
    }

    public function changeStatusOrder(Request $request)
    {
        $changeStatusResponse = new ActionResponseMessage();
        try {
            OrderList::where('Id', $request->orderId)->update(['Status'=>$request->status]);
            $changeStatusResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $changeStatusResponse->setIsSuccess(false);
            $changeStatusResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($changeStatusResponse);
    }

    public function deleteOrder(Request $request)
    {
        $deleteOrderResponse = new ActionResponseMessage();
        try {
            $orderId = $request->query('orderId');
            $orderItem = OrderList::where('Id', $orderId);
            if ($orderItem->first()->Status == 0) {
                OrderDetail::where('OrderId', $orderId)->delete();
                $orderItem->delete();
                $deleteOrderResponse->setIsSuccess(true);
            } else {
                throw new \Exception("Huỷ đơn hàng không thành công!");
            }
        } catch (\Exception $ex) {
            $deleteOrderResponse->setIsSuccess(false);
            $deleteOrderResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($deleteOrderResponse);
    }
}
