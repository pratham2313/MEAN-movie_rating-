export interface Movie {
    dates: Dates;
    page:number;
    results?:(ResultsEntity)[] | null;
    id?:(mongo)[] | null;
    total_page:number;
    total_results:number;

}
export interface Dates{
    maximum:string;
    minimum:string;
}
export interface ResultsEntity{
    name: string;
    adult:boolean;
    backdrop_path:string;
    genre_ids?:(number)[] | null;
    id: number;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:number;
    poster_path:string;
    release_date:string;
    title:string;
    video:boolean;
    vote_average:number;
    vote_count:number;
    runtime:number;
    key:string;
    videopath:string;
    official:boolean;
}
export interface mongo{
    movieid:string;
}
// export interface Results{
//     id:string;
//     rank:string;
//     title:string;
//     fullTitle:string;
//     year:string;
//     image:string;
//     crew:string;
//     imDbRating:string;
//     imDbRatingCount:string;
//     worldwideLifetimeGross:string;
//     domesticLifetimeGross:string;
//     domestic:string;
//     foreignLifetimeGross:string;
//     foreign:string;

// }
