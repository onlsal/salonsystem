import gql from 'graphql-tag';

export const GetQuery1 = gql`
query get_owner($gid: String!) {
  tblowner(where: {googleid: {_eq: $gid}}) {
    dojoid
    dojoname
    sei
    mei
    birth
    mail
    zip
    region
    local
    street
    extend
    url
    tel
  }
}`;

export const InsertOwner = gql`
mutation ins_owner($object: tblowner_insert_input!) {
  insert_tblowner_one(object: $object) {
    dojoid
    googleid
  }
}`;