import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test',
        genres: 'test',
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404', () => {
      try {
        service.getOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'test',
        genres: 'test',
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const after = service.getAll();
      expect(after.length).toBeLessThan(allMovies);
    });
    it('should throw 404', () => {
      try {
        service.deleteOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a movie', () => {
      const before = service.getAll().length;
      service.create({
        title: 'test',
        genres: 'test',
        year: 2000,
      });
      const after = service.getAll().length;
      expect(after).toBeGreaterThan(before);
    });
  });
});
