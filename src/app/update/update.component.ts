import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ArticleContent } from '../article-content.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  author: string = '';
  title: string = '';
  content: string = '';
  date: string='';
  articleObj: ArticleContent = new ArticleContent();
  articleArr: ArticleContent[] = [];
  addContent: any;
  data: any;
  articleData: ArticleContent[] = [];
  user: any;
  value: number = 0;

  constructor( private contentService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.author = '';
    this.title = '';
    this.content = '';
    this.date='';
    this.articleObj = new ArticleContent();
    this.addContent = {};
    // this.data = this.activatedRoute.snapshot.params['id'];
    this.edit();
  }

  // addBtn() {
  //   this.articleObj.author = this.author;
  //   this.articleObj.title = this.title;
  //   this.articleObj.content = this.content;
  //   this.articleObj.date = this.date;
  //   console.log('adddddd', this.articleObj);

  //   this.contentService.addContent(this.articleObj).subscribe((data) => {
  //     this.ngOnInit();
  //     console.log('successss', data);
  //   });
  // }

  edit() {
    let sub = this.activatedRoute.params.subscribe((res) => {
      this.data = res['id'];
    });
    console.log('Id:', this.data);

    this.contentService.edit(this.data).subscribe((data) => {
      this.articleObj = data;
      console.log('usssss', this.articleObj);
    });
  }

  updateArticle() {
    this.contentService.editContent(this.articleObj).subscribe((res) => {
      console.log('xxxxxxxxxxxx', res);
    });
    this.router.navigate(['']);
  }

}
