from django.http.response import JsonResponse
from rest_framework.decorators import api_view
import pandas as pd

outputPath = '../../Output/consolidated_output.1.csv'

@api_view(['GET'])
def hello_world(request):
    if request.method == 'GET':
        return JsonResponse("Hello World", safe=False)

@api_view(['GET', 'POST', 'DELETE'])
def products_list(request):
    if request.method == 'GET':
        quality = request.query_params.get('quality', None)
        ds = pd.read_csv(outputPath)
        if quality is not None:
            ds = ds[ds['quality'] == quality]
            return JsonResponse(ds.to_json(orient='records'), safe=False)
        else:
            return JsonResponse(ds.to_json(orient='records'), safe=False)

