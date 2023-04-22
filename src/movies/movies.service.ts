import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    //원래는 query문이 온다
    return this.movies;
  }

  getOne(id: number): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  create(movieData: CreateMovieDto): string {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return 'success';
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
