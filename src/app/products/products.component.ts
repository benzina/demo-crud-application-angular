import { Product } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = "";
  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(private productService: ProductService, private router:Router) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  /*
    private getAllProducts() {
      this.products$ = this.productService.getAllProducts();
    }
    */


  searchProducts() {
    this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize)
      .subscribe(
        {
          next: (res) => {
            this.products = res.body as Product[];
            let totalProduct: number = parseInt(res.headers.get('x-total-count')!);
            this.totalPages = Math.floor(totalProduct / this.pageSize);
            if (totalProduct % this.pageSize != 0) {
              this.totalPages = this.totalPages + 1;
            }
          },
          error: err => { console.error(err); }
        }
      );
  }


  hadleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => { product.checked = !product.checked },
      error: err => { console.log(err) }
    });
  }

  deleteProduct(product: Product) {
    if (confirm("etes vous sure ?"))
      this.productService.deleteProduct(product).subscribe({
        next: data => {
          this.products = this.products.filter(p => p.id != product.id)
        }
      })

  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.searchProducts();
  }

  editProduct(product: Product){
    this.router.navigateByUrl(`/edit-product/${product.id}`)
  }

}
