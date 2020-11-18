const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType
        , GraphQLString
        , GraphQLSchema
        , GraphQLID
        , GraphQLInt
         } = graphql;

// dummy data
const customer = [
    { id:1,code:"c01",name:"choiseongjun",mobile:"01030022702"}
];
const order = [
    {id:1,code:"o01",customer_id:"1",detail:{model:"iPhone X",color:"Space Gray",size:"large",order_date:"2020년 10월"},status:"delivered"}
]
const CustomerType = new GraphQLObjectType({
    name: 'customer',
    fields: ( ) => ({
        id: { type: GraphQLID },
        code: { type: GraphQLString },
        name: { type: GraphQLString },
        mobile:{type:GraphQLString}
    })
});
const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: ( ) => ({
        id: { type: GraphQLID },
        code: { type: GraphQLString },
        status:{type:GraphQLString},
        detail:{type:detailType},
        customer_id:{type:GraphQLInt},
        customer:{
            type:CustomerType,
            resolve(parent,args){
                return _.find(customer,{id:parent.id});
            }
        }
    })
});
const detailType = new graphql.GraphQLObjectType({
    name: 'Order_detail',
    fields: {
      model: { type: graphql.GraphQLString },
      color: { type: graphql.GraphQLString },
      size: { type: graphql.GraphQLString },
      order_date:{type:graphql.GraphQLString}
    }
  });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args){
                // code to get data from db / other source
                console.log(parent)
                return _.find(customer, { id: args.id });
            }
        },
        order:{
            type:OrderType,
            args:{status:{type:GraphQLString},model:{type:GraphQLString},color:{type:GraphQLString},order_date:{type:GraphQLString}},
            resolve(parent, args){
                return _.find(order, {status:args.status, detail:{model:args.model,color:args.color,order_date:args.order_date}});
            }
        },
    }
});
 

module.exports = new GraphQLSchema({
    query: RootQuery
});