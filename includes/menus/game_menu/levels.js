var block = {
    x: 0,
    y: 0,
    Type: {
        Main: 0,
        Sub: 0
    },
    Collisions: {
        Top: true,
        Bottom: true,
        Left: true,
        Right: true,
    }
};

var other_element = {
    x: 0,
    y: 0,
    Type: 0
};

var MapData_element = {
    "Name": "",
    "Map_limit": {
        x: 50,
        y: 50
    },
    "Player_spawn": {
        x: 0,
        y: 0
    },
    "Blocks": [block],
    "Water": [],
    "Interactive_blocks": [],
    "Ennemies": [],
    "Decorations": [],

};

var MapData_pack = {
    "Map_certificate": "CelesteDiscountMapDataApprovedCerticate",
    "Map_count": 1,
    "Name": "",
    "MapDatas": [MapData_element]
};

var leveltest1 = {
    "Map_certificate": "CelesteDiscountMapDataApprovedCerticate",
    "Map_count": 1,
    "Name": "",
    "MapDatas": [{
        "Name": "",
        "Map_limit": {
            x: 30,
            y: 30
        },
        "Player_spawn": {
            x: 10,
            y: 10
        },
        "Blocks": [{
                x: 9,
                y: 11,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 11,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 11,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 7,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 8,
                Type: { Main: 1, Sub: 11 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 1,
                y: 11,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 2,
                y: 11,
                Type: { Main: 1, Sub: 2 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 10,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 1,
                y: 10,
                Type: { Main: 1, Sub: 2 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 9,
                Type: { Main: 1, Sub: 2 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 11,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 1,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 2,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 3,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 6,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 7,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 8,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 9,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 10,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 11,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 12,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 14,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 15,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 16,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 18,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 19,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 20,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 12,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 12,
                Type: { Main: 1, Sub: 2 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 1,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 2,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 3,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 6,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 7,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 8,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 9,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 10,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 11,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 12,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 14,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 15,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 16,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 18,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 19,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 20,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 13,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 14,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 1,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 2,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 3,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 6,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 7,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 8,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 9,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 10,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 11,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 12,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 14,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 15,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 16,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 18,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 19,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 20,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 14,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 14,
                Type: { Main: 1, Sub: 10 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 2,
                y: 7,
                Type: { Main: 1, Sub: 11 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 11,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 11,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 10,
                Type: { Main: 1, Sub: 4 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 10,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 9,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 9,
                Type: { Main: 1, Sub: 2 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 6,
                Type: { Main: 1, Sub: 11 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 5,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 4,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 20,
                y: 11,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 1,
                y: 6,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 2,
                y: 5,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 3,
                y: 4,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 3,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 2,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 6,
                y: 1,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 7,
                y: 2,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 8,
                y: 3,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 7,
                y: 0,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 9,
                y: 4,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 10,
                y: 5,
                Type: { Main: 1, Sub: 15 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 7,
                Type: { Main: 1, Sub: 11 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 6,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 7,
                y: 7,
                Type: { Main: 1, Sub: 12 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 8,
                y: 7,
                Type: { Main: 1, Sub: 10 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 8,
                y: 6,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 5,
                Type: { Main: 1, Sub: 12 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 8,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 15,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 16,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 18,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 19,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 19,
                y: 29,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 20,
                y: 28,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 27,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 26,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 25,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 24,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 23,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 22,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 27,
                y: 21,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 20,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 19,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 18,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 14,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 12,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 11,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 10,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 9,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 7,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 6,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 3,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 2,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 1,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 29,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 28,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 27,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 26,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 25,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 24,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 23,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 22,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 21,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 20,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 19,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 18,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 17,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 16,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 0,
                y: 15,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 26,
                Type: { Main: 1, Sub: 11 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 25,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 24,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 23,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 22,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 21,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 20,
                Type: { Main: 1, Sub: 4 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 4,
                y: 19,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 19,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 6,
                y: 19,
                Type: { Main: 1, Sub: 14 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 5,
                y: 20,
                Type: { Main: 1, Sub: 10 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 26,
                Type: { Main: 1, Sub: 11 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 25,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 24,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 23,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 22,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 21,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 20,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 13,
                y: 19,
                Type: { Main: 1, Sub: 2 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 12,
                y: 19,
                Type: { Main: 1, Sub: 13 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 11,
                y: 19,
                Type: { Main: 1, Sub: 12 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 26,
                Type: { Main: 1, Sub: 11 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 25,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 24,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 23,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 22,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 21,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 20,
                Type: { Main: 1, Sub: 7 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 17,
                y: 19,
                Type: { Main: 1, Sub: 3 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 19,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 20,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 21,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 22,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 23,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 24,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 25,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 26,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 27,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 28,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 29,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 20,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 21,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 22,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 23,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 24,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 25,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 26,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 27,
                Type: { Main: 1, Sub: 4 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 28,
                Type: { Main: 1, Sub: 4 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 29,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 29,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 21,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 22,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 23,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 24,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 25,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 26,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 29,
                Type: { Main: 1, Sub: 0 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 28,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 27,
                y: 22,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 27,
                y: 23,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 27,
                y: 24,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 27,
                y: 25,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 27,
                y: 26,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 27,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 23,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 24,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 25,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 26,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 26,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 24,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 25,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 26,
                Type: { Main: 1, Sub: 9 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 25,
                y: 30,
                Type: { Main: 1, Sub: 1 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 25,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 26,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 27,
                Type: { Main: 1, Sub: 10 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 29,
                Type: { Main: 1, Sub: 2 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 24,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 26,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 27,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 28,
                Type: { Main: 1, Sub: 6 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 29,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 23,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 27,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 28,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 29,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 22,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 28,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 29,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 21,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 20,
                y: 29,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 20,
                y: 30,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 12,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            },
            {
                x: 30,
                y: 13,
                Type: { Main: 1, Sub: 5 },
                Collisions: { Top: true, Bottom: true, Left: true, Right: true }
            }
        ],
        "Water": [],
        "Interactive_blocks": [],
        "Ennemies": [],
        "Decorations": []
    }]
}

// var leveltest1 = {"MapData_certificate" : "CelesteDiscountMapDataApprovedCerticate",
// "Map_count" : 1,
// "Name" : "",
// "MapDatas" : [{
//   "Name" : "",
//   "Map_limit" : {
//     x : 17,
//     y : 10
//   },
//   "Player_spawn" : {
//       x : 9,
//       y : 4
//   },
//   "Blocks" : [{x : 9, y : 5,
//               Type       : {Main : 0, Sub : 3},
//               Collisions : {Top : true, Bottom : true, Left : true, Right : true}
//               },
//               // {x : 10, y : 5,
//               // Type       : {Main : 0, Sub : 3},
//               // Collisions : {Top : true, Bottom : true, Left : true, Right : true}
//               // }
//             ],
//               "Water" : [],
//               "Interactive_blocks" : [],
//               "Ennemies" : [],
//               "Decorations" : []
//             }]
//             }



export { leveltest1 };