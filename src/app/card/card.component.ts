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
  id:number;
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
  id:number=0;
  author: string = '';
  title: string = '';
  date: string = '';
  content: string = '';
  popup = false;
  data: any;
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
      console.log(
        'article',
        this.articleArr.sort((x: any, y: any) => y.id - x.id)
      );
    });
  }

  addNew(){
    console.log("ffffffffffffffff");
    if(this.id == 0){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '480px',
      width: '350px',
      data: {
        id:this.id, 
        author: this.author,
        title: this.title,
        date: this.date,
        content: this.content,
      },
    });
  }else{
    console.log("sorryyyyyyy");
    
  }
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


  deleteArticle(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data:any
  ): void {
    this.articleObj.id = data.id;
    this.articleObj.author = data.author;
    this.articleObj.title = data.title;
    this.articleObj.date = data.date;
    this.articleObj.content = data.content;
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        id: this.articleObj.id,
        author: this.articleObj.author,
        title: this.articleObj.title,
        date: this.articleObj.date,
        content: this.articleObj.content,
      },
    });
  }


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
   isValid = true;

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

  addArticle(){
    console.log("sendinggggg",this.articleObj);
    this.contentService.addContent(this.articleObj).subscribe((data) => {
      console.log('successss', data);
    });
    window.location.reload();
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(
    private contentService: ArticleService,
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public articleObj: DialogData
  ) {
    console.log("aaaaaaaaa",articleObj);
  }
  deleteConfirm(data: any) {
    this.contentService.deleteContent(data).subscribe((res) => {
      console.log('Successfully deleted', res);
    });
    window.location.reload();
  }
}
