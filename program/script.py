import pandas as pd

ds1 = pd.read_csv('./Input/data_source_1/sample_data.1.csv')
ds1_filtered = ds1[ds1['worth'] >= 1]

ds3 = pd.read_csv('./Input/data_source_2/sample_data.3.dat')
ds3_filtered = ds3
ds3_filtered['worth'] = ds3_filtered['worth'] * ds3_filtered['material_id']

ds2 = pd.read_csv('./Input/data_source_1/sample_data.2.dat', sep='|')
ds2_filtered = ds2.groupby(by=['product_name', 'quality', 'material_id'], as_index=False).sum()

merged_ds = ds1_filtered.merge(ds3_filtered, how='outer').merge(ds2_filtered, how='outer')

material_reference = pd.read_csv('./Input/data_source_2/material_reference.csv')

merged_ds = merged_ds.merge(material_reference, left_on='material_id', right_on='id')
merged_ds = merged_ds.filter(items=['product_name', 'quality', 'material_id', 'worth', 'material_name'])
print(merged_ds)

merged_ds.to_csv('./Output/consolidated_output.1.csv', index=False)