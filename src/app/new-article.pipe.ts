import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newArticle'
})
export class NewArticlePipe implements PipeTransform {

  transform(value: any[], filterBy: any): any[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null

    // for (let i = 0; i < value.length - 1; i++) {
    //     for (let j = 0; j < value.length - 1; j++) {
    //         if (value[j][filterBy] < value[j + 1][filterBy]) {
    //             let temp = value[j]
    //             value[j] = value[j + 1]
    //             value[j + 1] = temp
    //         }
    //     }
    // }
    value.sort((x:any,y:any) => y-x)
    return value;
}
}
