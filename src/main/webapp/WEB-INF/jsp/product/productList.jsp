<div ng-controller="product" class="card mb-3">
    <div class="card-header">
        Products
    </div>
    <div class="card-body" ng-init="loadProducts()">
        <div class="table-responsive">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-bordered bordered table-striped table-condensed datatable" ui-jq="dataTable" ui-options="dataTableOpt">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Sell Price</th>
                            <th>Cost Price</th>
                            <th>Hotlist</th>
                            <th>Scale</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="product in products" ng-click="viewProductDetails(product.code)">
                            <td><span ng-bind="product.code"></span></td>
                            <td><span ng-bind="product.productName"></span></td>
                            <td><span ng-bind="product.price"></span></td>
                            <td><span ng-bind="product.costPrice"></span></td>
                            <td><span ng-bind="product.hotlist"></span></td>
                            <td><span ng-bind="product.scale"></span></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>