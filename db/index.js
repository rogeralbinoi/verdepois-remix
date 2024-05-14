const initial_state = {
    post_links: [],
    categories: [
        {
            slugname: 'front-end',
            name: 'Front-end'
        },
        {
            slugname: "react",
            name: 'React'
        }
    ]
};

global.db_data = global.db_data || initial_state;
