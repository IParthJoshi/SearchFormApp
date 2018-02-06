import { Result as Res } from './result.model'
import { Facet } from './facet.model';

export class Result<T> extends Res {
    public data: T;
}

export class Page<T>
{
    public total: number;
    public pageStart: number;
    public pageSize: number;
    public list: Array<T>;
    public facets: Array<Facet>;
}