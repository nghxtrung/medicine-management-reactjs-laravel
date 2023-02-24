<?php

namespace App\Http\Controllers;

use App\Classes\ActionResponseMessage;
use App\Classes\ListResponseMessage;
use App\Classes\SingleResponseMessage;
use App\Models\Cart;
use App\Models\OrderDetail;
use App\Models\OrderList;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getCartUser(Request $request)
    {
        $cartListResponse = new ListResponseMessage();
        try {
            $userId = $request->query('userId');
            $cartList = Cart::where('UserId', $userId)->get();
            $cartListResponse->setIsSuccess(true);
            $cartListResponse->setDataList($cartList);
        } catch (\Exception $ex) {
            $cartListResponse->setIsSuccess(false);
            $cartListResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($cartListResponse);
    }

    public function updateCart(Request $request)
    {
        $updateCartActionResponse = new ActionResponseMessage();
        try {
            $updateCartRequest = $request->all();
            $userId = $updateCartRequest['userId'];
            $productId = $updateCartRequest['productId'];
            $buyQuantity = $updateCartRequest['buyQuantity'];
            $cartProductUser = Cart::where('UserId', $userId)->where('ProductId', $productId);
            if ($cartProductUser->first() == null) {
                $newCartProductUser = new Cart();
                $newCartProductUser->UserId = $userId;
                $newCartProductUser->ProductId = $productId;
                $newCartProductUser->BuyQuantity = $buyQuantity;
                $newCartProductUser->save();
            } else {
                $buyQuantityUpdate = $cartProductUser->first()->BuyQuantity + $buyQuantity;
                $cartProductUser->update(['BuyQuantity' => $buyQuantityUpdate]);
            }
            $updateCartActionResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $updateCartActionResponse->setIsSuccess(false);
            $updateCartActionResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($updateCartActionResponse);
    }

    public function updateProductCart(Request $request)
    {
        $updateProductCartResponse = new ActionResponseMessage();
        try {
            $updateProductCartRequest = $request->all();
            $userId = $updateProductCartRequest['userId'];
            $productId = $updateProductCartRequest['productId'];
            $buyQuantity = $updateProductCartRequest['buyQuantity'];
            Cart::where('UserId', $userId)->where('ProductId', $productId)->update(['BuyQuantity' => $buyQuantity]);
            $updateProductCartResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $updateProductCartResponse->setIsSuccess(false);
            $updateProductCartResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($updateProductCartResponse);
    }

    public function removeProductCart(Request $request) {
        $removeCartActionResponse = new ActionResponseMessage();
        try {
            $removeCartRequest = $request->all();
            $userId = $removeCartRequest['userId'];
            $productId = $removeCartRequest['productId'];
            Cart::where('UserId', $userId)->where('ProductId', $productId)->delete();
            $removeCartActionResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $removeCartActionResponse->setIsSuccess(false);
            $removeCartActionResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($removeCartActionResponse);
    }

    public function submitOrder(Request $request) {
        $submitResponse = new ActionResponseMessage();
        try {
            $newOrderInfo = new OrderList();
            $newOrderInfo->UserId = $request->userId;
            $newOrderInfo->CustomerName = $request->customerName;
            $newOrderInfo->PhoneNumber = $request->phoneNumber;
            $newOrderInfo->Address = $request->address;
            $newOrderInfo->Note = $request->note;
            $newOrderInfo->TotalMoney = $request->totalMoney;
            $newOrderInfo->Status = 0;
            $newOrderInfo->save();
            $productListOrder = json_decode($request->productListOrder);
            foreach ($productListOrder as $productOrder) {
                $newOrderDetail = new OrderDetail();
                $newOrderDetail->OrderId = OrderList::all()->last()->Id;
                $newOrderDetail->ProductId = $productOrder->ProductId;
                $newOrderDetail->BuyQuantity = $productOrder->BuyQuantity;
                $newOrderDetail->save();
                $product = Product::where('Id', $productOrder->ProductId);
                $newQuantity = $product->first()->Quantity - $productOrder->BuyQuantity;
                $product->update(['Quantity' => $newQuantity]);
            }
            Cart::where('UserId', $request->userId)->delete();
            $submitResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $submitResponse->setIsSuccess(false);
            $submitResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($submitResponse);
    }
}
