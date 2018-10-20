<div ng-controller="product">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Product Details</h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <form role="form">
                                <div class="form-group">
                                    <label>Code</label>
                                    <input class="form-control" ng-model="product.code" />
                                </div>
                                <div class="form-group">
                                    <label>Name</label>
                                    <input class="form-control" ng-model="product.productName" />
                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea class="form-control" ng-model="product.description" />
                                </div>

                            </form>
                        </div>
                        <div class="col-lg-6">
                                <div class="form-group">
                                    <label>Price</label>
                                    <input class="form-control" ng-model="product.price">
                                </div>
                                <div class="form-group">
                                    <label>costPrice</label>
                                    <input class="form-control" ng-model="product.costPrice">
                                </div>
                                <div class="form-group">
                                    <label>HotList</label>
                                    <input type = "checkbox" class="" ng-model="product.hotlist">
                                </div>

                        </div>
                     <div class="col-md-3">
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>