import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../article.service';
import { ArticleContent } from '../article-content.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  author: string;
  title: string;
  articleObj: ArticleContent;
  articleArr: ArticleContent;
  articleId: number;
  article: any;
  date: string;
  content: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  articleObj: ArticleContent = new ArticleContent();
  articleArr: ArticleContent[] = [];
  articleId: number = 1;
  article: any;
  author: string = '';
  title: string = '';
  date: string = '';
  content: string = '';
  popup = false;
  data: any;
  animal: string = '';
  name: string = '';

  constructor(
    private contentService: ArticleService,
    private router: Router,
    private active: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.author = '';
    this.title = '';
    this.content = '';
    console.log('Component Started');
    this.contentService.getContent(this.articleId).subscribe((res) => {
      this.articleArr = res;
      // this.articleArr
      console.log(
        'article',
        this.articleArr.sort((x: any, y: any) => y - x)
      );
    });
  }

  editArticle(data: any) {
    this.articleObj.id = data.id;
    this.articleObj.author = data.author;
    this.articleObj.title = data.title;
    this.articleObj.date = data.date;
    this.articleObj.content = data.content;
    // this.contentService.editContent(data).subscribe((res) => {
    //   // this.ngOnInit();
    //   console.log('Successfully editing', res);
    //   // this.router.navigate([`/edit/${res.id}`]);
    // });
  }

  edit() {
    this.active.params.subscribe((res) => {
      this.data = res['id'];
    });
    console.log('Id:', this.data);

    this.contentService.edit(this.data).subscribe((data) => {
      this.articleObj = data;
      console.log('usssss', this.articleObj);
    });
  }

  deleteArticle(data: any) {
    var result = confirm('Are you sure you want to delete this Article?');
    if (result == true) {
      this.contentService.deleteContent(data).subscribe((res) => {
        this.ngOnInit();
        console.log('Successfully deleted', res);
      });
    } else {
      console.log('canceled');
    }
  }

  // updateArticle() {
  //   this.contentService.editContent(this.articleObj).subscribe((res) => {
  //     console.log('xxxxxxxxxxxx', res);
  //   });
  //   this.popup = false;
  //   window.location.reload();
  // }

  openDialog(data: any): void {
    this.articleObj.id = data.id;
    this.articleObj.author = data.author;
    this.articleObj.title = data.title;
    this.articleObj.date = data.date;
    this.articleObj.content = data.content;
    console.log('dataaa', data);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '480px',
      width: '350px',
      data: {
        id: this.articleObj.id,
        author: this.articleObj.author,
        title: this.articleObj.title,
        date: this.articleObj.date,
        content: this.articleObj.content,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', data);
      // this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    private contentService: ArticleService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public articleObj: DialogData
  ) {
    console.log('hhhhhhhhhhhhhhhhh', articleObj);
  }

  updateArticle() {
    this.contentService.editContent(this.articleObj).subscribe((res) => {
      console.log('xxxxxxxxxxxx', res);
      window.location.reload();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}