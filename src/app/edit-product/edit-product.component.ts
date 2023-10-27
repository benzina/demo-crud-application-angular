import { ProductService } from './../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId!: number;
  productFormGroup!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: product => {
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id, Validators.required),
          name: this.fb.control(product.name, Validators.required),
          price: this.fb.control(product.price, [Validators.min(100)]),
          checked: this.fb.control(product.checked, Validators.required)
        })
      },
      error: err => { console.log(err); }
    })
  }

  updateProduct() {
    let product: Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: product=> {
        alert(JSON.stringify(product));
      }
    })
  }
}
