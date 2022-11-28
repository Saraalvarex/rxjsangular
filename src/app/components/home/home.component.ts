import { forkJoin } from 'rxjs';
import { Producto } from './../../models/producto';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products!: Array<Producto>
  public productos!: any
  public idProductos!: Array<number>
  public user!: User
  public carrito!: any
  public product!: Producto

  constructor(private _service: ProductosService) { }

  // Array de ids de productos
  getIdProductos(){
    var arrAux=[]
    for (let i=0; i<this.carrito.products.length; i++){
        arrAux.push(this.carrito.products[i].productId)
    }
    this.idProductos=arrAux
  }

  // Array de ids de productos obtenidos en esta funcion getProductosCarrito(5)
  // Obtenemos los detalles de los productos de un carrito especifico
  getDetallesProductosCarrito(){
    this._service.getDetallesProductos(this.idProductos).subscribe(response=>{
      console.log(response)
      this.product=response
    })
  }

  getProductosCategory(){
    //En paralelo
    forkJoin(
      // jewelery
      this._service.getProductosCategoria("men's clothing"),
      this._service.getProductosCategoria("women's clothing")
    ).subscribe(res=>{
     this.productos=res
     console.log(this.productos)
    })
  }

  ngOnInit(): void {
      // Mandamos id de carrito para obtener el usuario de ese carrito
      /*-------------------------- id carrito -------------------*/
      this._service.getUsuarioDeCarrito(5).subscribe(resu=>{
        this.user=resu
      })

      // Obtenemos ids de los productos de un carrito mandando el id del mismo
      /*-------------------------- id carrito -------------------*/
      this._service.getProductosCarrito(5).subscribe(resu=>{
        this.carrito=resu;
        this.getIdProductos();
      })

      this.getProductosCategory();
  }
}
