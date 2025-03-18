import {CategoryTypes, FeaturedBlogTypes} from "../types.ts";


export const featuredBlogs: FeaturedBlogTypes[] = [
    {
        id: 1,
        title: "Web Development tricks",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid blanditiis inventore numquam quasi quidem ullam. Maiores molestiae officia repellat! Alias autem cupiditate error eveniet iusto natus ratione rerum voluptatum. Adipisci animi asperiores, at autem deserunt, dignissimos ducimus eius error esse excepturi illo, in maxime minima molestiae nisi odit officia officiis optio praesentium qui quod ratione sapiente sint sit vel voluptates voluptatum? Adipisci aliquam atque autem commodi deserunt distinctio dolor ducimus earum eligendi enim est eveniet expedita facere in molestias nam necessitatibus nulla odit perspiciatis quae quasi quibusdam quod ratione repudiandae sequi similique, vel! A adipisci amet cupiditate dolores doloribus dolorum eligendi ex expedita fugit illum ipsa, ipsum maxime nesciunt numquam quam quidem quos repudiandae sint sit unde! Ipsum, nihil, quidem.",
        image: 'blog1.jpg',
        category: 'Web Development',
        isFeatured: true,
        isFavorite: true
    },
    {
        id: 2,
        title: "New Economy model",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid blanditiis inventore numquam.",
        image: 'blog2.jpg',
        category: 'Economy',
        isFeatured: true,
        isFavorite: false
    },
    {
        id: 3,
        title: "Office Life",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid blanditiis inventore numquam quasi quidem ullam. Maiores molestiae officia repellat! Alias autem cupiditate error eveniet iusto natus ratione rerum voluptatum. Adipisci animi asperiores, at autem deserunt, dignissimos ducimus eius error esse excepturi illo, in maxime minima molestiae nisi odit officia officiis optio praesentium qui quod ratione sapiente sint sit vel voluptates voluptatum? Adipisci aliquam atque autem commodi deserunt distinctio dolor ducimus earum eligendi enim est eveniet expedita facere in molestias nam necessitatibus nulla odit perspiciatis quae quasi quibusdam quod ratione repudiandae sequi similique, vel! A adipisci amet cupiditate dolores doloribus dolorum eligendi ex expedita fugit illum ipsa, ipsum maxime nesciunt numquam quam quidem quos repudiandae sint sit unde! Ipsum, nihil, quidem.",
        image: 'blog3.jpg',
        category: 'Office',
        isFeatured: true,
        isFavorite: false
    },
    {
        id: 4,
        title: "Life and Sport",
        description: "Lorem ipsum quidem.",
        image: 'blog4.jpg',
        category: 'Sport',
        isFeatured: true,
        isFavorite: true
    }
]

export const dummyCategory: CategoryTypes[] = [
    {
        id: "1",
        category: "Frontend Development",
        slug: "frontend-development"
    },
    {
        id: "2",
        category: "Data Science",
        slug: "data-science"
    },
    {
        id: "3",
        category: "Sport",
        slug: "sport"
    },
    {
        id: "4",
        category: "Economy",
        slug: "economy"
    },
    {
        id: "5",
        category: "Politics",
        slug: "politics"
    }
]