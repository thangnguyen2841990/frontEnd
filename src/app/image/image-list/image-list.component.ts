import {Component, OnInit} from '@angular/core';
import {ImageService} from '../../service/image.service';
import {Image} from '../../model/image';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: Image[] = [];
  id: number;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.getAllImagesByProductId(this.id);
  }

  getAllImagesByProductId(id: number) {
    this.imageService.getAll(id).subscribe(images => {
      this.images = images;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < images.length; i++) {
        this.id = images[i].product.id;
      }
    });
  }

}
