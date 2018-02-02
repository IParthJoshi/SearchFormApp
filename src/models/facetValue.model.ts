import { ContentBase } from './common/contentBase.model';

export class FacetValue {
// total count
public count: number;
// value of facet
public value: any;
// Content Info of facet
public contentInfo: ContentBase;
// In case of range filter
public from: any;
// In case of range filter
public to: any;
}