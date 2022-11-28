import { Injectable } from "@angular/core";
import { map, from, Observable, switchMap, concatMap, mergeMap, exhaustMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class ProductosService {
    constructor(private _http: HttpClient){}

    getUsuarioDeCarrito(id: number): Observable<any> {
      // 1er
        return this._http.get(environment.urlFakeStore+'carts/' + id).pipe(
          switchMap((carrito: any) =>
          // 2º
          this._http.get(environment.urlFakeStore+'users/' + carrito.userId).pipe((user: any) => {
              return user;
            })
          )
        );
      }
    
    getProductosCarrito(id: number): Observable<any> {
        return this._http.get(environment.urlFakeStore+'carts/' + id)
    }
    
    // Ejemplo from
    getDetallesProductos(idsproductos: Array<number>): Observable<any> {
      return from(idsproductos).pipe(
        //podemos usar mergeMap o concatMap
        mergeMap((id) =>
           <Observable<any>> this._http.get(environment.urlFakeStore+'products/' + id))
        // exhaustMap((id) =>
        //    <Observable<any>> this._http.get(environment.urlFakeStore+'carts?userId=' + id))
      )
    }

    getProductosCategoria(categoria: string): Observable<any>{
        var request = "products/category/"+categoria;
        var url = environment.urlFakeStore + request;
        console.log(url)
        return this._http.get(url);
    }
}