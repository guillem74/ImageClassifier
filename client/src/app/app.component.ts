import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  image: any;
  logo: any;
  veredict;

  constructor(private http: Http) {

  }

  onUploadFinished(event) {
    console.log(event.file)

    this.image = event.file;

    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.logo = e.target.result;
    }

    reader.readAsDataURL(event.file);
    //this.veredict = "Veredict";
  }

  onRemoved(event) {
    this.logo = null;
    this.image = null;
    this.veredict = null;
  }

  uploadImage() {
    const formData: any = new FormData();
    const files: Array<File> = [];
    files[0] = this.image;

    formData.append("uploads[]", files[0], files[0]['name']);
    this.http.post(`http://localhost:3000/upload`, formData)
      .map((res: Response) => res.json())
      .subscribe(data => {
        this.veredict=data.veredict;
          console.log(data);
      });
  }

}