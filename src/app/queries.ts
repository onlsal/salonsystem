import gql from 'graphql-tag';

export const GetQuery1 = gql`
query get_owner($gid: String!) {
  tblowner(where: {googleid: {_eq: $gid}}) {
    dojoid
    dojoname
    sei
    mei
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

export const GetQuery2 = gql`
query get_dojoid {
  tblowner_aggregate {
    aggregate {
      max {
        dojoid
      }
    }
  }
}`;

export const InsertOwner = gql`
mutation ins_owner($object: tblowner_insert_input!) {
  insert_tblowner_one(object: $object) {
    dojoid
    googleid
  }
}`;

export const InsertForm = gql`
mutation ins_form($objects: [tblform_insert_input!]!) {
  insert_tblform(objects: $objects) {
    affected_rows
  }
}`;

export const InsertCalender = gql`
mutation ins_cal($objects: [tblcalender_insert_input!]!) {
  insert_tblcalender(objects: $objects) {
    affected_rows
  }
}`;