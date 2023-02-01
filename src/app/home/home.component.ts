import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ArticleContent } from '../article-content.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private contentService: ArticleService,
    private router: Router,
    private active: ActivatedRoute
  ) {}
  articleObj: ArticleContent = new ArticleContent();
  articleArr: ArticleContent[] = [];
  articleId: number = 1;
  article: any;
  author: string = '';
  title: string = '';
  date: string = '';
  content: string = '';
  ngOnInit(): void {
    this.author = '';
    this.title = '';
    this.content = '';
    console.log('Component Started');
    this.contentService.getContent(this.articleId).subscribe((res) => {
      this.articleArr = res;
      console.log('articleeee', this.articleArr);
    });
  }

  editArticle(data:any) {
    this.articleObj.author = this.author;
    this.articleObj.title = this.title;
    this.articleObj.date = this.date;
    this.articleObj.content = this.content;
    this.contentService.editContent(data).subscribe((res) => {
      this.ngOnInit();
      console.log('Successfully editing', res);
      this.router.navigate([`/edit/${res.id}`]);
    });
  }

  // call(data: any) {
  //   this.articleObj = data;
  //   console.log('getttttttttt', this.articleObj);
  // }

  deleteArticle(data: any) {
    this.contentService.deleteContent(data).subscribe((res) => {
      this.ngOnInit();
      console.log('Successfully deleted', res);
    });
  }
}
