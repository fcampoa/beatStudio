import { GlobalApiService } from './../global-service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';



export class CustomDataSource implements DataSource<any> {

    private lessonsSubject = new BehaviorSubject<any[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private apiSvc: GlobalApiService) {

    }

    loadData(id?: number,
             filter?: string,
             sortDirection?: string,
             pageIndex?: number,
             pageSize?: number,
             mod?: string) {

        this.loadingSubject.next(true);
        this.apiSvc.routes[mod].getPages()<any>({id, search: filter, order: sortDirection,
          start: pageIndex, perPage: pageSize}).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(data => {
               this.lessonsSubject.next(data.data.list);
              }
              );

    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        console.log('Connecting data source');
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}
