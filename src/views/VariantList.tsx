import React from 'react'
import { Card, Avatar, Checkbox, InputNumber, Space } from 'antd'
import { Variant } from '../data'
import styled from 'styled-components'

export interface VariantCardProps {
    variant: Variant
    cataloged: boolean
    quantity?: number
    onCatalogAdd: (id: string) => void
    onCatalogRemove: (id: string) => void
    onQuantityUpdate: (id: string, quantity: number) => void
}

export const VariantCard = (props: VariantCardProps) => {
    const {
        variant,
        cataloged,
        quantity,
        onCatalogAdd,
        onCatalogRemove,
        onQuantityUpdate,
    } = props

    return (
        <StyledCard
            size={'small'}
            title={<CardTitle>{variant.variation}</CardTitle>}
        >
            <Avatar src={variant.image} size={90} />
            <Space style={{ width: '100%' }}>
                <span>Catalog:</span>
                <Checkbox
                    checked={cataloged}
                    onChange={(e) =>
                        e.target.checked
                            ? onCatalogAdd(variant.uniqueEntryId)
                            : onCatalogRemove(variant.uniqueEntryId)
                    }
                />
            </Space>
            <Space style={{ width: '100%' }}>
                <span>Storage:</span>
                <InputNumber
                    disabled={!cataloged}
                    value={quantity}
                    onChange={(value) => {
                        if (typeof value === 'number')
                            onQuantityUpdate(variant.uniqueEntryId, value)
                    }}
                    style={{ width: 60 }}
                />
            </Space>
        </StyledCard>
    )
}

const StyledCard = styled(Card)`
    .ant-card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const CardTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const VariantListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    column-gap: 8px;
    row-gap: 8px;
`
