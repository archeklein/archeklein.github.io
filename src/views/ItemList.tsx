import React, { useState, useEffect } from 'react'
import { forSale as source, Items, Variant } from '../data'
import { capitalize, Cataloged } from '../utils'
import { Table, Avatar, Input, Checkbox, InputNumber } from 'antd'
import axios from 'axios'
import { VariantCard, VariantListWrapper } from './VariantList'

export const ItemList = () => {
    const [searchKey, setSearchKey] = useState<string>('')
    const [dataSource, setDataSource] = useState<Items[]>(source)
    const [catalog, setCatalog] = useState<Cataloged[]>([])
    const [expandedRows, setExpandedRows] = useState<string[]>([])

    const itemColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            render: (name: string) => capitalize(name),
        },
        {
            title: 'Cataloged',
            dataIndex: 'variants',
            key: 'cataloged',
            width: 200,
            render: (variants: Variant[]) => (
                <Checkbox
                    checked={variants.every((variant) =>
                        cataloged(variant.uniqueEntryId)
                    )}
                    onChange={(e) => {
                        e.target.checked
                            ? variants.forEach(
                                  (v) =>
                                      !cataloged(v.uniqueEntryId) &&
                                      handleCatalogAdd(v.uniqueEntryId)
                              )
                            : variants.forEach(
                                  (v) =>
                                      cataloged(v.uniqueEntryId) &&
                                      handleCatalogRemove(v.uniqueEntryId)
                              )
                    }}
                />
            ),
        },
        {
            title: 'Inventory',
            dataIndex: 'variants',
            key: 'cataloged',
            render: (variants: Variant[]) =>
                variants.every((variant) => owned(variant.uniqueEntryId))
                    ? 'All in inventory'
                    : '',
        },
    ]

    useEffect(() => {
        fetchCatalog()
    }, [])

    const cataloged = (id: string) =>
        !!catalog.filter((item: Cataloged) => item.variantId === id).length

    const owned = (id: string) =>
        !!catalog.filter(
            (item: Cataloged) => item.variantId === id && item.quantity > 0
        ).length

    const quantity = (id: string) =>
        catalog.find((item: Cataloged) => item.variantId === id)?.quantity

    const fetchCatalog = async () => {
        axios.get('http://localhost:4001/catalog/all').then((res) => {
            setCatalog(res.data)
        })
    }

    const handleCatalogAdd = (uniqueID: string) => {
        axios
            .post('http://localhost:4001/catalog/create', {
                variantId: uniqueID,
            })
            .then((res) => {
                console.log(res)
                fetchCatalog()
            })
            .catch((error) => 'Catalog add error')
    }

    const handleCatalogRemove = (uniqueID: string) => {
        axios
            .put('http://localhost:4001/catalog/delete', {
                variantId: uniqueID,
            })
            .then((res) => {
                fetchCatalog()
            })
            .catch((error) => 'Catalog remove error')
    }

    const handleQuantityChange = (uniqueID: string, value: number) => {
        axios
            .put('http://localhost:4001/catalog/quantity', {
                variantId: uniqueID,
                quantity: value,
            })
            .then((res) => {
                console.log(res)
                fetchCatalog()
            })
            .catch((error) => 'Catalog remove error')
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value
        setSearchKey(key)
        setDataSource(
            source.filter((item: Items) => item.name.includes(key))
        )
    }

    return (
        <div>
            <Input.Search
                style={{ width: 300 }}
                value={searchKey}
                onChange={onSearch}
            />
            <Table
                pagination={{ position: ['topLeft'], pageSize: 15 }}
                dataSource={dataSource}
                columns={itemColumns}
                rowKey={'name'}
                expandedRowKeys={expandedRows}
                onExpandedRowsChange={(expandedRows) =>
                    setExpandedRows(expandedRows.map((row) => row.toString()))
                }
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: (event) => {
                            const newExpandedRows = expandedRows.includes(
                                record.name
                            )
                                ? expandedRows.filter(
                                      (id) => id !== record.name
                                  )
                                : expandedRows.concat(record.name)
                            setExpandedRows(newExpandedRows)
                        },
                    }
                }}
                size={'small'}
                expandable={{
                    expandedRowRender: (item: Items) => (
                        <VariantListWrapper>
                            {item.variants.map((v) => (
                                <VariantCard
                                    variant={v}
                                    cataloged={cataloged(v.uniqueEntryId)}
                                    quantity={quantity(v.uniqueEntryId)}
                                    onCatalogAdd={handleCatalogAdd}
                                    onCatalogRemove={handleCatalogRemove}
                                    onQuantityUpdate={handleQuantityChange}
                                />
                            ))}
                        </VariantListWrapper>
                    ),
                }}
            />
        </div>
    )
}
