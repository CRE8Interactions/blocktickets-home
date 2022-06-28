import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { formatCurrency, formatNumber } from '../../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';

import { StatRow } from '../../../StatRow';

export default function Chart({ title, total, amount, stat, statAmount, text, sales }) {

    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: null,
        },

        legend: {
            enabled: false
        },

        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%b %e', this.value)
                }
            },
            style: {
                color: '#777E90'
            }
        },

        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return '$' + Highcharts.numberFormat(this.value, 0, '.', ',', ',')
                }
            },
            style: {
                color: "#777E90"
            }
        },

        tooltip: {
            backgroundColor: '#272B30',
            borderColor: '#272B30',
            borderRadius: '8px',
            style: {
                color: '#FCFCFD'
            },
            xDateFormat: '%A',
            pointFormatter: function () {
                return '$' + Highcharts.numberFormat('{point.x}', 0, '.', ',', ',')
            },

            useHTML: true
        },

        plotOptions: {
            series: {
                pointInterval: 24 * 3600 * 1000
            }
        },

        series: [
            {
                data: [43934, 52503, 57177, 69658, 97031]
            }
        ]
    }
    return (
        <div id="reports">
            <Stack direction="horizontal" className="split-row mb-4">
                <Stack>
                    <h1 className='fs-md'>{title}</h1>
                    <StatRow bg={true} stat={stat} statAmount={statAmount} text={`vs ${text}`} />
                </Stack>
                <Stack className='text-end' gap={1}>
                    <span className='fw-semi-bold fs-md'>{total ? `${formatCurrency(total)}` : `${formatNumber(amount)}`}</span>
                    <span className="fw-semi-bold text-muted">{sales}</span>
                </Stack>
            </Stack>
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
}
