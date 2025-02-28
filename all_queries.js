// 1.How many users are active?
[
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: "activeUsers",
  },
];

// 2.what is the average age of all users?

[
  {
    $group: {
      _id: null,
      averageAge:
      {
        $avg: "$age"
      }
      
      }
  }
  
]

//3.List the top 5 most common favorite fruits grouped among the users 

//->acending order
[ 
  {
    $group: {
      _id: "$favoriteFruit",
      count:{
        $sum:1
      }
      
    },
  },
  {
    $sort: {
      count: 1 //acending order
    }
  }
]

//->decending order
[ 
  {
    $group: {
      _id: "$favoriteFruit",
      count:{
        $sum:1
      }
      
    },
  },
  {
    $sort: {
      count: -1
    }
  }
]

//->limit up 2 wants to see top 2
[ 
  {
    $group: {
      _id: "$favoriteFruit",
      count:{
        $sum:1
      }
      
    },
  },
  {
    $sort: {
      count: -1
    }
  },
  {
    $limit: 2
  }
]

//4 Find the total number of male and females?

[
  {
    $group: {
      _id: "$gender",
      genderCount:{
        $sum:1
      }
     
    }
  }
 ]

 //5 Which country has the highest total number of registerd users?
 [
  {
    $group: {
      _id:"$company.location.country",
      userCount:{
        $sum:1 //each and every country get the sum of total number
      }
     
    }
  },
   {
     $sort: {
       userCount: -1 //decending order provide the code
     }
   },
   {
    $limit:3 //top 3 result gives
  }
 ]

 //6.List all unique eye colors present in the collection.
 [
  {
    $group: {
      _id:"$eyeColor",
      
    }
  }
 ]

 //7..what is the average number of tags per user?

 //1-> First approch
 [
  {
    $unwind: "$tags" //This will use separate documents parse and construct the array.
     
  },
  {
  	$group: {
  	  _id:"$_id",
      numberofTags:{ //This the use total sum of tags 
        $sum:1
      }
  	}  
  },
  {
    $group: {
      _id: null,
      averageNumberofTags:{$avg:"$numberofTags"} //This tags numberof tags sum and get a avg find.
      
    }
  }
]

 //2-> second approch

 [
  {
    $addFields: {
  			numberofTags:{
          $size:{$ifNull:["$tags",[]]} //If conditon apply because of array is null then empty array define
        }
    }
  },
  {
    $group: {
      _id: null,
     averageNumberofTags:{$avg:"$numberofTags"} //This array apply get a averageof number tags will get the result
    }
  }
]


//8.How many users have 'enim' as one of their tags?
[
  {
    $match: {
    		tags:"enim"
    }
  },{
    $count: 'userenimTag'
  }
]


//9.what are the names and age of users who are inactive and have 'velit' as a tag?

[
  {
    $match: {
    	isActive:false,
      tags:"velit"
    }
  },{
    $project: {
      name:1,age:1
    }
  }
]

//10.How many users have a phone number starting with '+1 (940);?

[
  {
    $match: {
      "company.phone": /^\+1 \(940\)/
    }
  },
  {
    $count: "userswithspecialphone",
  }
]

// 11.who has registerd the most recently?
[
  {
    $sort: {
      registered: -1
    }
  },
  {
    $limit: 4
  },
  {
    $project: {
      name:1,
      registered:1,
      favoriteFruit:1
    }
  }
]

// 12.categorize users by their favorite fruits?

[
  {
    $group: {
      _id: "$favoriteFruit",
      users:{$push:"$name"},
      
      
    }
  }
]

// 13.How many users have 'ad' as the second tag in their list of tags?
[
  {
    $match: {
      "tags.1": "ad"
    },
  },
  {
    $count: 'secondTagAd'
  }
]

// 14.Find users who have both 'enim' and 'id' as their tags?
[
  {
    $match: {
      tags:{$all:['enim','id']}
    }
  },
  {
    $count: 'allmatch'
  }
]

//15.List all companies located in the usa with their corresponding user count.

[
  {
    $match: {
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: "$company.title",
      userCount: {
        $sum: 1,
      },
    },
  },
]

// 16.Lookup

[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  },
  {
    $addFields: {
      author_details: {
        $first:"$author_details"
      }
    }
  }
]
