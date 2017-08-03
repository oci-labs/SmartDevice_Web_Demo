package com.nexmatix.datastore

import com.google.cloud.datastore.Cursor
import com.google.cloud.datastore.Datastore
import com.google.cloud.datastore.DatastoreOptions
import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.Key
import com.google.cloud.datastore.KeyFactory
import com.google.cloud.datastore.Query
import com.google.cloud.datastore.QueryResults
import com.google.cloud.datastore.StructuredQuery

import javax.annotation.PostConstruct

/**
 * Created by zak on 7/31/17.
 */
trait DataStoreService<T> {

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService()
    String kind
    KeyFactory keyFactory


    List<T> listEntities(Integer max, Integer offset/*, String sort*/) {
        println "listEntities for ${kind}"
        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind(kind)
                .setLimit(max)
                //.setOrderBy(StructuredQuery.OrderBy.desc("${sort}"))
                .build()
        QueryResults<Entity> resultList = datastore.run(query)

        return transformEntities(resultList)
    }


    T retrieveEntity(def id) {
        println "retrieveEntity: ${id}"
        Key key = getKey(id)
        println "getting ${key} for ${kind}..."


        transformEntity(datastore.get(key))
    }


    List<T> transformEntities(QueryResults<Entity> queryResults) {
        println "transformEntities..."
        queryResults.collect { transformEntity(it) }
    }

    abstract T transformEntity(Entity entity)

    Key getKey(def id) {
        return keyFactory.newKey("${id}")
    }

}