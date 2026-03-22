import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  private readonly blogs = [
    {
      id: 1,
      blogTitle: 'Blog 1',
      blogUniqueKey: 'blogUniqueKey1',
    },
    {
      id: 2,
      blogTitle: 'Blog 2',
      blogUniqueKey: 'blogUniqueKey2',
    },
    {
      id: 3,
      blogTitle: 'Blog 3',
      blogUniqueKey: 'blogUniqueKey3',
    },
  ];

  findAll() {
    return this.blogs;
  }

  findById(id: number) {
    return this.blogs.find(blog=>blog.id===id)
  }

  findByUniqueKey(key: string) {
    return this.blogs.find(blog=>blog.blogUniqueKey===key)
  }
}
