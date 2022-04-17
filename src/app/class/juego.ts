export class Juego {
    titulo : String;
    descripcion: String;
    url : String;
    imgUrl : String;

    constructor(titulo:String, descripcion: String, url : String, imgUrl : String){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
        this.imgUrl = imgUrl;
    }
}
