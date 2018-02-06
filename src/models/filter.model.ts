import { Range } from './range.model'

export class Filter {
    public key: string;
    public values: Array<any>;
    public ranges: Array<Range>;
}