import { FacetValue } from './facetValue.model';

export class Facet {
    // Model key -> cruiselineId, destinationId, shipId, departurePortCode, etc.
    public key: string;
    // If range filter is true then we seek for a different value property compare to others. 
    public is_range_filter: boolean;
    // Values array associagted with each key in response.
    public values: Array<FacetValue>;
}