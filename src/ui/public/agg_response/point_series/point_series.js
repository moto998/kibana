/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getSeries } from './_get_series';
import { getAspects } from './_get_aspects';
import { initYAxis } from './_init_y_axis';
import { initXAxis } from './_init_x_axis';
import { orderedDateAxis } from './_ordered_date_axis';
import { PointSeriesTooltipFormatter } from './_tooltip_formatter';

export function AggResponsePointSeriesProvider(Private) {

  const tooltipFormatter = Private(PointSeriesTooltipFormatter);

  return function pointSeriesChartDataFromTable(table, dimensions) {
    const chart = {
      aspects: getAspects(table, dimensions),
      tooltipFormatter
    };

    initXAxis(chart);
    initYAxis(chart);


    if (chart.aspects.x[0].params.date) {
      orderedDateAxis(chart);
    }

    chart.series = getSeries(table, chart);

    delete chart.aspects;
    return chart;
  };
}
