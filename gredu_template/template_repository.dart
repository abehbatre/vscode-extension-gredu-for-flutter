import 'package:gredu_revamp/app/core/base/base_repository.dart';
import 'package:gredu_revamp/app/core/networking/outcome.dart';

class TemplateRepository extends BaseRepository {
  
  // TODO: Replace this ~
  Future<Outcome> getTemplate() {
    return apiService.httpGet(
      endPoint: '/Template',
    );
  }

}
